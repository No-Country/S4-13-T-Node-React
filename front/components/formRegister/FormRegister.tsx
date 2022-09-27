import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

type values = {
  email: string;
  username: string;
  password: string;
};

const validateRegisterSchema = Yup.object({
  email: Yup.string()
    .email("Debes ingresar un email válido")
    .required("Email requerido"),
  username: Yup.string()
    .min(2, "El nombre de usuario es demasiado corto")
    .max(15, "El nombre de usuario es demasiado largo")
    .required("Nombre de usuario requerido"),
  password: Yup.string()
    .min(6, "El password debe tener al menos 6 caracteres")
    .required("Password requerido"),
});

const FormRegister = () => {
  const handleSubmit = (values: values) => {
    console.log("Registrado exitosamente");
    console.log(values);
  };

  return (
    <>
      <h1>Registro</h1>
      {
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validateRegisterSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form className="flex flex-col justify-center align-center gap-2">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="border-2 border-secondary rounded-lg px-2 py-1"
                />
                {errors.email && touched.email ? (
                  <div className="text-xs">{errors.email}</div>
                ) : null}
                <Field
                  name="username"
                  placeholder="Nombre de usuario"
                  className="border-2 border-secondary rounded-lg px-2 py-1"
                />
                {errors.username && touched.username ? (
                  <div className="text-xs">{errors.username}</div>
                ) : null}
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="border-2 border-secondary rounded-lg px-2 py-1"
                />
                {errors.password && touched.password ? (
                  <div className="text-xs">{errors.password}</div>
                ) : null}
                <button
                  type="submit"
                  className="border-2 border-primary rounded-lg px-4 py-1 text-primary"
                >
                  Login
                </button>
              </Form>
            );
          }}
        </Formik>
      }
    </>
  );
};

export default FormRegister;
