import { Link, useOutletContext, useParams } from "react-router-dom";
import { Note } from "./types";
import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap";
import Markdown from "react-markdown";

type Props = {
  deleteNote: (id: string) => void;
};

const Detail = ({ deleteNote }: Props) => {
  const { id } = useParams();
  const note = useOutletContext<Note>();
  return (
    <Container className="mx-auto py-5">
      <Row>
        <Col className="my-2">
          <h1 className="pb-4">{note.title}</h1>
          <Stack direction="horizontal" gap={2}>
            {note.tags.map((tag) => (
              <Badge>{tag.label}</Badge>
            ))}
          </Stack>
        </Col>
      </Row>
      <Col>
        <Stack direction="horizontal" gap={3} className="justify-content-end">
          <Link to={"/"}>
            <Button variant="warning">BACK</Button>
          </Link>
          <Link to={"edit"}>
            <Button variant="success">EDIT</Button>
          </Link>

          <Button onClick={() => deleteNote(note.id)} variant="danger">
            DELETE
          </Button>
        </Stack>
      </Col>
      <Markdown className="mt-5 p-2 bg-white text-black ">
        {note.markdown}
      </Markdown>
    </Container>
  );
};

export default Detail;
