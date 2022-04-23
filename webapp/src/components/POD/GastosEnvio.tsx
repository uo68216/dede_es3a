import {getSolidDataset,getThing,getStringNoLocale,Thing,getUrl} from "@inrupt/solid-client";
import { VCARD } from "@inrupt/lit-generated-vocab-common";
import React, {useEffect} from "react";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { calcularValorGastosdeEnvío } from "./Coordenadas";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margen:{
      margin: '-25px 0 0 -25px',
      marginRight:'30%',
      display: 'flex',
      justifyContent:'center',
      position: 'absolute',
      top: '40%',
      left: '35%'
      
    }
  })
);
function FinishBuying(){
    if(JSON.parse(sessionStorage.getItem('cart') as string).length > 0){
      sessionStorage.setItem('cart', JSON.stringify([]));
      sessionStorage.setItem('webIdSesion',JSON.stringify([]))
      alert("Compra realizada");
    }
  }
async function userAddress(): Promise<string> {
    let web=sessionStorage.getItem('webIdSesion') as string
    let profileDocumentURI = web.split("#")[0]
    let myDataSet = await getSolidDataset(profileDocumentURI)
    let profile = getThing(myDataSet, sessionStorage.getItem('webIdSesion')as string)
    let hasAddress = getUrl(profile as Thing, VCARD.hasAddress) as string
    let addressUser = await getThing(myDataSet, hasAddress)

    let street_address= getStringNoLocale(addressUser as Thing, VCARD.street_address) as string
    let locality= getStringNoLocale(addressUser as Thing, VCARD.locality) as string
    let postal_code= getStringNoLocale(addressUser as Thing, VCARD.postal_code) as string
    let region= getStringNoLocale(addressUser as Thing, VCARD.region) as string
    let country= getStringNoLocale(addressUser as Thing, VCARD.country_name) as string;
    let address = street_address+" "+ locality+ " "+postal_code+" "+region+" " + country;
    return address;
  }

function GastosEnvio(): JSX.Element {
    const classes = useStyles();
    const [address, setAddress] = React.useState<string>("");
    const [gastosdeEnvio, setGastosdeEnvio] = React.useState<Number>(0);
    const getAddress = async () => setAddress(await userAddress())
    

    useEffect(() => {
        getAddress();
        cal();
        
    });

    const cal = async () => {
      setGastosdeEnvio( await calcularValorGastosdeEnvío(address) );
    };
    return (
        <Container>
          <div className={classes.margen}>
              <Card>
                  <Typography variant='h5'>
                      Precio total + Gastos de envío: {gastosdeEnvio}
                  </Typography>
              </Card>

              <Button variant="contained" endIcon={<ShoppingCartIcon />}  size='large' onClick={FinishBuying} href='http://localhost:3000'>
                  Finalizar Compra
              </Button>
          </div>
      </Container>
    );
  }
export default GastosEnvio;