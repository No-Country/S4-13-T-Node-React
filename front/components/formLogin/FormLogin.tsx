import { Formik, Form, Field } from "formik";
import React from "react";
import * as Yup from "yup";

type values = {
  email: string;
  password: string;
};

const validateLoginSchema = Yup.object({
  email: Yup.string()
    .email("Debes ingresar un email válido")
    .required("Email requerido"),
  password: Yup.string()
    .min(6, "El password debe tener al menos 6 caracteres")
    .required("Password requerido"),
});

const FormLogin = () => {
  const handleSubmit = (values: values) => {
    console.log("Ingresaste a la página");
    console.log(values);
  };

  return (
    <>
      <h1>Inicio de sesión</h1>
      {
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validateLoginSchema}
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

export default FormLogin;
