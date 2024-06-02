import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SigninValidation } from "@/lib/validation";
import { z } from "zod";
import { Loader } from "lucide-react";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();
  
  const { mutateAsync: signInAccount } = useSignInAccount();

  // 1. Define your form
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session) {
      return toast({title: 'Login falhou. Tente de novo, por favor.'})
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();

      navigate('/')
    } else {
      return toast({ title: 'Registro falhou. Tente de novo, por favor.'})
    }
  }

  return (
    <Form {...form}>
      <div className="flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Bem Vindo de volta</h2>
        <p className="text-light-3">Vamos nos conectar em segundos</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex center gap-2">
                  <Loader/> Carregando...
              </div>
            ): "Sign in"}
          </Button>

          <p className="text-small-regular text-center">
              <Link to="/sign-up" className="text-primary text-small-semibold"> Registre-se aqui.</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;