import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Joi from "joi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);

export const EditPatientProfile = ({ patient, onSave }) => {
  const [pwForm, setPwForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isOldVisible, setIsOldVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  console.log("pwForm", pwForm);

  const [errors, setErrors] = useState({});

  const [profilePic, setProfilePic] = useState(null);

  const handlePwChange = (event) => {
    const { name, value } = event.target;

    const { error } = newPasswordSchema
      .extract(name)
      .label(name)
      .validate(value);

    if (error) {
      if (name === "confirmPassword") {
        setErrors({
          ...errors,
          [name]: "Password does not match.",
        });
      } else {
        if (value === pwForm.oldPassword) {
          setErrors({
            ...errors,
            [name]: "New password should be different from your old password.",
          });
        } else {
          setErrors({
            ...errors,
            [name]: error.details[0].message,
          });
        }
      }
    } else {
      setErrors({ ...errors, [name]: null });
    }

    setPwForm({ ...pwForm, [name]: value });
  };

  function isPwFormInvalid() {
    const error = newPasswordSchema.validate(pwForm).error;
    console.log(error);
    return !!error;
  }

  const handleSave = () => {
    const pwFormHasInputs =
      !!pwForm.confirmPassword || !!pwForm.newPassword || !!pwForm.oldPassword;
    if (pwFormHasInputs && !isPwFormInvalid()) {
      onSave(pwForm);
    }
  };

  const styles = {
    box: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      borderRadius: 10,
      boxShadow: 24,
      p: 4,
    },
  };

  const newPasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .min(8)
      .required()
      .not(pwForm.oldPassword)
      .messages({
        "password.minOfSpecialCharacters":
          "Password requires lowercase, uppercase, number, and special character.",
        "password.minOfLowercase":
          "Password requires lowercase, uppercase, number, and special character.",
        "password.minOfUppercase":
          "Password requires lowercase, uppercase, number, and special character.",
        "password.minOfNumeric":
          "Password requires lowercase, uppercase, number, and special character.",
        "password.noWhiteSpaces": "White spaces are not allowed.",
        "string.min": "Password requires a minimum length of 8.",
        "string.empty": "Please input your new password.",
      }),
    confirmPassword: Joi.string().equal(pwForm.newPassword).required(),
  });

  return (
    <Box sx={styles.box}>
      <Stack
        direction={{ xs: "column" }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        spacing={2}
      >
        <Button
          sx={{ backgroundColor: "transparent", borderRadius: "100%" }}
          onClick={() => {
            const fileInput = document.getElementById("file-input");
            fileInput.click();
          }}
        >
          <Avatar
            alt="Doreamon"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU"
            sx={{
              m: 1,
              bgcolor: "primary.main",
              width: { xs: 100, sm: 130, md: 140 },
              height: { xs: 100, sm: 130, md: 140 },
              border: "5px solid white",
              boxShadow: 10,
            }}
          />
          <input
            id="file-input"
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </Button>
        <Typography variant="subtitle2" color="green">
          Click the Avatar to Change Profile
        </Typography>
        <FormControl sx={{ minWidth: "100%" }}>
          {/* <InputLabel id="demo-multiple-checkbox-label">HMO</InputLabel>
          <Select
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            fullWidth
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select> */}
        </FormControl>
        {/* <TextField variant="outlined" label="Add New HMO" fullWidth /> */}
        <Stack width={"100%"}>
          <TextField
            name="oldPassword"
            value={pwForm.oldPassword}
            onChange={handlePwChange}
            variant="outlined"
            label="Enter current password"
            fullWidth
            type={isOldVisible ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setIsOldVisible(!isOldVisible)}
                    edge="end"
                    size="small"
                  >
                    {isOldVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword || " "}
          />
          <TextField
            name="newPassword"
            value={pwForm.newPassword}
            onChange={handlePwChange}
            variant="outlined"
            label="Enter new password"
            type={isNewVisible ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setIsNewVisible(!isNewVisible)}
                    edge="end"
                    size="small"
                  >
                    {isNewVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errors.newPassword}
            helperText={errors.newPassword || " "}
            fullWidth
          />
          <TextField
            name="confirmPassword"
            value={pwForm.confirmPassword}
            onChange={handlePwChange}
            variant="outlined"
            label="Confirm new password"
            fullWidth
            type={isConfirmVisible ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                    edge="end"
                    size="small"
                  >
                    {isConfirmVisible ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword || " "}
          />
        </Stack>
        <Button variant="contained" fullWidth onClick={handleSave}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};
