import Container from './Container/Container'
import FormControl from './FormControl/FormControl';
import Form from './Form/Form'



const DataCalculator = () => {
    return (
        
            <Container>
                <Form>
                    <FormControl id="day" label="Day" placeholder="DD" min={1} max={31} />
                    <FormControl id="month" label="Month" placeholder="MM" min={1} max={12} />
                    <FormControl id="year" label="Year" placeholder="YYYY" min={1} />
                </Form>
            </Container>
      
    );
};

export default DataCalculator;
