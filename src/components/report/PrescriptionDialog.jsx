import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SelectFormulation from "./SelectFormulation";
import StandardSignatura from "./StandardSignatura";

const STANDARD_SIG = {
  action: "",
  totalPerIntake: "",
  packaging: "capsule/s",
  totalPerDay: "",
  totalDays: "",
};
const CUSTOM_SIG = "";

export default function PrescriptionDialog({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    type: "STANDARD",
    formulation: null,
    signatura: STANDARD_SIG,
    subscription: "",
  });
  console.log("prescription form", form);

  function handleSave() {
    onSave({
      formulation: form.formulation,
      signatura: form.signatura,
      subscription: form.subscription,
    });
    onClose();
  }

  function handleChange(event, value, origin) {
    switch (origin) {
      case "type":
        {
          const newSig = value === "STANDARD" ? STANDARD_SIG : CUSTOM_SIG;
          setForm({ ...form, type: value, signatura: newSig });
        }
        break;
      case "subscription":
        {
          const numericValue = value.replace(/[^0-9.-]+/g, "");
          setForm({ ...form, subscription: +numericValue });
        }
        break;
      case "signatura":
        setForm({ ...form, signatura: value });
        break;
      case "formulation":
        setForm({ ...form, formulation: value });
        break;
      default:
        throw new Error("Invalid input");
    }
  }

  function handleSigChange(event, value, property) {
    let newSig;
    switch (property) {
      case "action":
        {
          newSig = { ...form.signatura, action: value };
        }
        break;
      case "packaging":
        {
          newSig = { ...form.signatura, packaging: value };
        }
        break;
      case "totalPerIntake":
        {
          const numericValue = value.replace(/[^0-9.-]+/g, "");
          newSig = { ...form.signatura, totalPerIntake: +numericValue };
        }
        break;
      case "totalPerDay":
        {
          const numericValue = value.replace(/[^0-9.-]+/g, "");
          newSig = { ...form.signatura, totalPerDay: +numericValue };
        }
        break;
      case "totalDays":
        {
          const numericValue = value.replace(/[^0-9.-]+/g, "");
          newSig = { ...form.signatura, totalDays: +numericValue };
        }
        break;
      default:
        throw new Error("Invalid input");
    }
    if (isStandardSigComplete(newSig)) {
      const computedSub =
        newSig.totalPerIntake * newSig.totalPerDay * newSig.totalDays;
      setForm({ ...form, signatura: newSig, subscription: computedSub });
      console.log("completed sig");
    } else {
      setForm({ ...form, signatura: newSig, subscription: "" });
      console.log("incomplete sig");
    }
  }

  function isStandardSigComplete(signatura) {
    return (
      !!signatura.action &&
      !!signatura.totalPerIntake &&
      !!signatura.packaging &&
      !!signatura.totalPerDay &&
      !!signatura.totalDays
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"lg"}>
      <DialogTitle>Prescription</DialogTitle>
      <DialogContent>
        <SelectType
          value={form.type}
          onChange={(event) => handleChange(event, event.target.value, "type")}
        />
        <Grid container alignItems="space-between" spacing={2}>
          <Grid item xs={9}>
            <SelectFormulation
              value={form.formulation}
              onSelect={(event, value) =>
                handleChange(event, value, "formulation")
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Stack direction={`row`} spacing={1} alignItems={`center`}>
              <Typography variant="body1">#</Typography>
              <TextField
                value={form.subscription}
                onChange={(event) =>
                  handleChange(event, event.target.value, "subscription")
                }
                fullWidth
                variant="outlined"
              />
            </Stack>
          </Grid>
          {form.type === "CUSTOM" && (
            <Grid item md={12}>
              <TextField
                value={form.signatura}
                onChange={(event) =>
                  handleChange(event, event.target.value, "signatura")
                }
                label="Signatura"
                fullWidth
                variant="outlined"
              />
            </Grid>
          )}
          {form.type === "STANDARD" && (
            <StandardSignatura form={form} onSigChange={handleSigChange} />
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function SelectType({ value, onChange }) {
  return (
    <FormControl>
      <RadioGroup name="type" value={value} onChange={onChange}>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <FormControlLabel
              value="STANDARD"
              control={<Radio />}
              label="Standard"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              value="CUSTOM"
              control={<Radio />}
              label="Custom"
            />
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}
