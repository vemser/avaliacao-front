import { useContext, useState } from "react";

import { Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../utils/schemas";
import { ILogin, IUsuario } from "../../utils/interface";

import { toast } from "react-toastify";
import { toastConfig } from "../../utils/toast";

import backgroundLogin from "../../assets/bg-login.png";
import logo from "../../assets/dbc-logo.webp";

import { Box, Button, Typography, Stack, InputLabel, OutlinedInput, InputAdornment, IconButton, FormControl, Modal } from "@mui/material";
import { LoginOutlined, Visibility, VisibilityOff, Email, ForwardToInbox } from "@mui/icons-material";

import { AuthContext } from "../../context/AuthContext";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "5px",
  textAlign: "center",
  boxShadow: 24,
  p: 4,
};

export const Login = () => {
  // Funções context
  const { usuarioLogin, redefinirSenha, tokenAuth } = useContext(AuthContext);
  const infosUsuario = JSON.parse(localStorage.getItem("infoUsuario") || "{}");

  const [values, setValues] = useState<ILogin>({ password: "", showPassword: false });
  const [verificarEmailModal, setVerificarEmailModal] = useState("");

  // Funções exibir senha / esconder senha
  const handleChange = (prop: keyof ILogin) => (event: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, [prop]: event.target.value });
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });

  const { register, handleSubmit, formState: { errors } } = useForm<IUsuario>({
    resolver: yupResolver(userSchema)
  });

  // Submit Formulario Login
  const onSubmit = (data: IUsuario) => { usuarioLogin(data); }

  // Funções Modal
  const [open, setOpen] = useState(false);
  const [inputEmailModal, setInputEmailModal] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmitModal = () => {
    const dominio = verificarEmailModal.split("@");
    if (dominio[1] === "dbccompany.com.br") {
      redefinirSenha(inputEmailModal);
      handleClose();
    } else {
      toast.error("Por favor digite um email válido. Ex: fulano@dbccompany.com.br", toastConfig);
    }
  };

  const cargoSplitado = infosUsuario?.cargo?.split(" ")[0].toLowerCase();
  if (tokenAuth) return <Navigate to={`/dashboard/${cargoSplitado}`} />

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
              <InputLabel htmlFor="email" error={!!errors.email}>Email</InputLabel>
              <OutlinedInput id="email" type="email" error={!!errors.email} {...register("email")} placeholder="fulano.silva@dbccompany.com.br" label="Email" endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" sx={{ cursor: "initial", ":hover": { background: "transparent" } }}>
                    <Email />
                  </IconButton>
                </InputAdornment>
              } />
              {errors.email && <Typography id="erro-email" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.email.message}</Typography>}
            </FormControl>

            <FormControl sx={{ width: { xs: "90%", md: "70%" } }} variant="outlined">
              <InputLabel htmlFor="senha" >Senha</InputLabel>
              <OutlinedInput id="senha" {...register("senha")} placeholder="Insira sua senha" type={values.showPassword ? "text" : "password"} label="Senha" value={values.password} onChange={handleChange("password")} endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              } />
              {errors.senha && <Typography id="erro-senha" sx={{ fontWeight: "500", display: "flex", marginTop: "5px" }} color="error">{errors.senha.message}</Typography>}
            </FormControl>

            <Button id="botao-logar" size="medium" type="submit" endIcon={<LoginOutlined />} sx={{ width: "180px", backgroundColor: "#1e62fe", textTransform: "capitalize", fontSize: "1.1rem", fontWeight: 600 }} variant="contained">Entrar</Button>

          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
