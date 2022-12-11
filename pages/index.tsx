import Nav from "../components/Navbar/Nav";
import Container from "../components/Container/Container";
import Tweets from "../components/Tweets/Tweets";
export default function Home() : JSX.Element {
  return (
    <Container>
      <Nav/>
      <Tweets/>
    </Container>
  )
}