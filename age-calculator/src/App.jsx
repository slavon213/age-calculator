import Container from "./components/Container/Container";
import Form from "./components/Form/Form";
import FormControl from "./components/FormControl/FormControl";

function App() {
    return (
        <main>
            <Container>
                <Form>
                    <FormControl id="day" label="Day" placeholder="DD" min={1} max={31} />
                    <FormControl id="month" label="Month" placeholder="MM" min={1} max={12} />
                    <FormControl id="year" label="Year" placeholder="YYYY" min={1} />
                </Form>
            </Container>
        </main>
    );
}

export default App;
