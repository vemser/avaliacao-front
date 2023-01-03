import { useState } from "react";

import { Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../utils/schemas";
import { ILogin, IUsuario } from "../../utils/interface";

import backgroundLogin from "../../assets/bg-login.png";

import { Box, Button, Typography, Stack, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl } from "@mui/material";
import { LoginOutlined, Visibility, VisibilityOff, AccountCircle } from "@mui/icons-material";

import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const { usuarioLogin } = useAuth();
  const token = localStorage.getItem('token');

  const [values, setValues] = useState<ILogin>({ password: "", showPassword: false });

  const handleChange = (prop: keyof ILogin) => (event: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, [prop]: event.target.value });
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });

  const { register, handleSubmit, formState: { errors } } = useForm<IUsuario>({
    resolver: yupResolver(userSchema)
  });

  const onSubmit = (data: IUsuario) => {
    if (data.username.includes("@")) {
      const novoData = { username: data.username.split("@")[0], password: data.password }
      usuarioLogin(novoData);
    } else {
      usuarioLogin(data);
    }
  }

  if (token) return <Navigate to={`/alunos`} />

  return (
    <Box id="container-global" component="section" sx={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

      <Box id="box-esquerda" sx={{ backgroundImage: `url(${backgroundLogin})`, width: "40%", height: "100%", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", display: { xs: "none", md: "block" } }}></Box>

      <Box id="box-direita" sx={{ width: { xs: "100%", md: "60%" }, height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", backgroundColor: { md: "#F5F5F5", xs: "linear-gradient(151deg, rgba(17,29,77,0.8631827731092436) 0%, rgba(28,88,248,0.938813025210084) 70%)" } }}>

        <Box id="box-login" component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{
          backgroundColor: "var(--branco)", width: {
            xs: "90%", md: "70%"
          }, borderRadius: 3, padding: { xs: 2, md: 5 }, boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.25)"
        }}>
          <Stack spacing={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography id="titulo" variant='h3' sx={{ color: "#1e62fe", fontWeight: "700", userSelect: "none" }}>AvaliaSer</Typography>
            <Typography id="subtitulo" variant='body1' sx={{ color: "#090F27", fontWeight: "600", userSelect: "none" }}>Faça seu login!</Typography>

            <FormControl sx={{ width: { xs: "90%", md: "70%" } }} variant="outlined">
              <InputLabel htmlFor="usuario" error={!!errors.username}>Usuário</InputLabel>
              <OutlinedInput id="usuario" type="text" error={!!errors.username} {...register("username")} placeholder="Ex: fulano.silva" label="Usuário" endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" sx={{ cursor: "initial", ":hover": { background: "transparent" } }}>
                    <AccountCircle />
                  </IconButton>
                </InputAdornment>
              } />
              {errors.username && <Typography id="erro-email" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.username.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs: "90%", md: "70%" } }} variant="outlined">
              <InputLabel htmlFor="senha">Senha</InputLabel>
              <OutlinedInput id="senha" {...register("password")} placeholder="Insira sua senha" type={values.showPassword ? "text" : "password"} label="Senha" value={values.password} onChange={handleChange("password")} endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              } />
              {errors.password && <Typography id="erro-senha" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.password.message}</Typography>}
            </FormControl>

            <Button id="botao-logar" size="medium" type="submit" endIcon={<LoginOutlined />} sx={{ fontSize: "1.1rem", fontWeight: 600, textTransform: "capitalize", width: "180px", backgroundColor: "#1e62fe" }} variant="contained">Entrar</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
