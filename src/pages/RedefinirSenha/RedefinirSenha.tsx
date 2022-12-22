import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import backgroundRedefinriSenha from "../../assets/bg-redefinir-senha.png";

import { Box, Button, Typography, Stack, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl } from "@mui/material";
import { LoginOutlined, Visibility, VisibilityOff, EnhancedEncryption } from "@mui/icons-material";

import { ILogin } from "../../utils/interface";
import { redefinirSenhaSchema } from "../../utils/schemas";
import { AuthContext } from "../../context/AuthContext";

interface INovaSenha {
  novaSenha: string,
  confirmarNovaSenha: string
}

export const RedefinirSenha = () => {
  const { recuperarSenha } = useContext(AuthContext)

  const [values, setValues] = useState<ILogin>({ password: "", showPassword: false });

  const handleChange = (prop: keyof ILogin) => (event: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, [prop]: event.target.value });
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });

  const { register, handleSubmit, formState: { errors } } = useForm<INovaSenha>({
    resolver: yupResolver(redefinirSenhaSchema)
  });

  const redefinirSenha = (data: INovaSenha) => {
    const senha = data.confirmarNovaSenha
    recuperarSenha(senha)
  }

  return (
    <>
      :
      <Box id="container-global" component="section" sx={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

        <Box id="box-esquerda" sx={{ backgroundImage: `url(${backgroundRedefinriSenha})`, width: "45%", height: "100%", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", display: { xs: "none", md: "block" } }}></Box>

        <Box id="box-direita" sx={{ width: { xs: "100%", md: "55%" }, height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", backgroundColor: { md: "#f8f8ff", xs: "linear-gradient(151deg, rgba(17,29,77,0.8631827731092436) 0%, rgba(28,88,248,0.938813025210084) 70%)" } }}>

          <Box id="box-login" component="form" onSubmit={handleSubmit(redefinirSenha)} sx={{ backgroundColor: "var(--branco)", width: { xs: "90%", md: "70%" }, borderRadius: 3, padding: { xs: 2, md: 5 }, boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.25)" }}>

            <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography id="titulo" variant='h3' sx={{ color: "#1e62fe", fontWeight: "700" }}>Redefinir senha</Typography>
              <Typography id="subtitulo" variant='body1' sx={{ color: "#090F27", fontWeight: "600" }}>Coloque sua nova senha! </Typography>

              <FormControl sx={{ width: { xs: "90%", md: "70%" } }} variant="outlined">
                <InputLabel htmlFor="Nova senha">Nova senha</InputLabel>
                <OutlinedInput id="nova-senha" {...register("novaSenha")} type="password" placeholder="Insira sua nova senha" label="Nova senha" endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" sx={{ cursor: "initial", ":hover": { background: "transparent" } }}>
                      <EnhancedEncryption />
                    </IconButton>
                  </InputAdornment>
                } />
                {errors.novaSenha && <Typography id="erro-nova-senha" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.novaSenha.message}</Typography>}
              </FormControl>

              <FormControl sx={{ width: { xs: "90%", md: "70%" } }} variant="outlined">
                <InputLabel htmlFor="Confirme a senha">Confirme a senha</InputLabel>
                <OutlinedInput id="confirmar-nova-senha" {...register("confirmarNovaSenha")} placeholder="Insira sua senha" type={values.showPassword ? "text" : "password"} label="Confirme a senha" value={values.password} onChange={handleChange("password")} endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                } />
                {errors.confirmarNovaSenha && <Typography id="erro-confirmar-nova-senha" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.confirmarNovaSenha.message}</Typography>}
              </FormControl>

              <Button id="botao-redefinir-senha" size="medium" type="submit" endIcon={<LoginOutlined />} sx={{ backgroundColor: "#1e62fe" }} variant="contained">Redefinir</Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

