
import List from './List';
import Nav from './Nav';
import Shoes from './Shoes';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';
const useStyles = makeStyles({
  sizes: {
    marginLeft:'34%',
    marginTop:'100px',
    
  },
  container:{
   height: '90vh',
   width: '90vw',
   
   display: 'grid',
   gridTemplateAreas: `'header header header'
                        'left main right'
                        'footer footer footer'`,
   gridTemplateRows: '1fr 3fr 1fr',
   gridTemplateColumns: '1fr 2fr 1fr',
},
main: {
 gridArea: 'main',
  
},
footer: {
  gridArea: 'footer'
  
},
header: {
  gridArea: 'header'
  
},
left: {
  gridArea: 'left'
  
},right: {
  gridArea: 'right'
  
}

    


});
const Home = () => {
  const classes = useStyles();
    
    return (
      <div>
        <Nav />
        <Shoes/>
        <List/>
        <Footer/>
      </div>
    );
  };
  export default Home;