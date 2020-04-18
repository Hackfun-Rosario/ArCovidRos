import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import moment from "moment";

import { METHODS, ENDPOINTS } from "utils/constants";
import { Layout } from "components";

const Abm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);

    await axios({
      method: METHODS.POST,
      url: ENDPOINTS.ABM,
      data: {},
    })
      .then((response) => {})
      .catch((error) => {
        console.warn("Error while tryng to log in", error);
      });

    setLoading(false);
  };

  const [date, setDate] = useState<date>(null);
  const [province, setProvince] = useState<string>("");
  const [cases, setCases] = useState<number>(null);
  const [newCases, setNewCases] = useState<number>(null);
  const [deads, setDeads] = useState<number>(null);
  const [newDeads, setNewDeads] = useState<number>(null);
  const [recover, setRecover] = useState<number>(null);
  const [newRecover, setNewRecover] = useState<number>(null);
  const [url, setUrl] = useState<string>("");

  //Campos para editar

  const [dateEdit, setDateEdit] = useState<date>(null);
  const [provinceEdit, setProvinceEdit] = useState<string>("");
  const [casesEdit, setCasesEdit] = useState<number>(null);
  const [newCasesEdit, setNewCasesEdit] = useState<number>(null);
  const [deadsEdit, setDeadsEdit] = useState<number>(null);
  const [newDeadsEdit, setNewDeadsEdit] = useState<number>(null);
  const [recoverEdit, setRecoverEdit] = useState<number>(null);
  const [newRecoverEdit, setNewRecoverEdit] = useState<number>(null);
  const [urlEdit, setUrlEdit] = useState<string>("");

  return (
    <Layout>
      <Grid container justify="center" direction="row" spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h5">Alta de casos por Provincia</Typography>
        </Grid>

        <Grid item xs={6}>
          <Grid item>
            <TextField
              fullWidth
              label="Día"
              required
              value={date}
              onChange={(e) => setDate(e?.target?.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Total de confirmados"
              required
              value={cases}
              onChange={(e) => setCases(e?.target?.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Total de muertos"
              value={deads}
              onChange={(e) => setDeads(e?.target?.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Total de recuperados"
              required
              value={recover}
              onChange={(e) => setRecover(e?.target?.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Url"
              required
              value={url}
              onChange={(e) => setUrl(e?.target?.value)}
            />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid item>
            <TextField
              fullWidth
              label="Provincia"
              required
              value={province}
              onChange={(e) => setProvince(e?.target?.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Nuevos casos"
              value={newCases}
              onChange={(e) => setNewCases(e?.target?.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Nuevos muertos"
              value={newDeads}
              onChange={(e) => setNewDeads(e?.target?.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Nuevos recuperados"
              value={newRecover}
              onChange={(e) => setNewRecover(e?.target?.value)}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} align="right">
          <Button
            color="primary"
            disabled={loading}
            variant="contained"
            onClick={handleClick}
          >
            Agregar
          </Button>
        </Grid>
        <br />
        <Divider variant="middle" />

        <Grid item xs={3}>
          <Typography variant="h5">
            Actualización de casos por Provincia
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <InputLabel id="elect-fecha">Fecha</InputLabel>
            <Select
              style={{ minWidth: "120" }}
              labelId="select-fecha"
              id="select-fecha"
              displayEmpty
            >
              <MenuItem disabled value="">
                Fecha
              </MenuItem>
            </Select>
            <FormHelperText>
              Seleccionar una fecha para actualizar
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl>
            <InputLabel id="elect-prov">Provincia</InputLabel>
            <Select
              style={{ minWidth: "120" }}
              labelId="select-prov"
              id="select-prov"
              displayEmpty
            >
              <MenuItem disabled value="">
                Provincia
              </MenuItem>
              {}
            </Select>
            <FormHelperText>Seleccionar Provincia</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <Grid item>
            <TextField fullWidth label="Día" required value={dateEdit} />
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Total de confirmados"
              required
              value={casesEdit}
              onChange={(e) => setCasesEdit(e?.target?.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Total de muertos"
              value={deadsEdit}
              onChange={(e) => setDeadsEdit(e?.target?.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Total de recuperados"
              required
              value={recoverEdit}
              onChange={(e) => setRecoverEdit(e?.target?.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Url"
              required
              value={urlEdit}
              onChange={(e) => setUrlEdit(e?.target?.value)}
            />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid item>
            <TextField
              fullWidth
              label="Provincia"
              required
              disabled
              value={provinceEdit}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Nuevos casos"
              value={newCasesEdit}
              onChange={(e) => setNewCasesEdit(e?.target?.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Nuevos muertos"
              value={newDeadsEdit}
              onChange={(e) => setNewDeadsEdit(e?.target?.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Nuevos recuperados"
              value={newRecoverEdit}
              onChange={(e) => setNewRecoverEdit(e?.target?.value)}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} align="right">
          <Button color="primary" disabled={loading} variant="contained">
            Actualizar
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Abm;
