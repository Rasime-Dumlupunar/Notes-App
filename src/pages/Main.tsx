import { Button, Col, Container, Row, Stack, Form } from "react-bootstrap";
import { Note, Tag } from "./types";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";

type Props = {
  availableTags: Tag[];
  notes: Note[];
};

const Main = ({ availableTags, notes }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  /*
    1) Not başlığı 1. inputta aratılan metni içermelidir
    Note'un başlığının küçük harfe çevrilmiş hali aratılan metnin küçük harfe çevrilmiş halini içeriyorsa koşul sağlanır.
    
    &&

    2) 2. input ile seçilen etiketler note'un içerisindeki etiketler ile 
    birebir eşleşmelidir. Seçilen etiketler dizindeki her bir etiket için note'a 
    ait etiketler arasında eşleşme kontrolü yapacağız.

    every
    */

  const filtredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) &&
          selectedTags.every((s_tag) =>
            note.tags.some((note_tags) => note_tags.value === s_tag.value)
          )
      ),
    [query, selectedTags]
  );

  return (
    <Container className="mx-auto py-5">
      {/* Üst Kısım */}
      <Stack direction="horizontal" className="justify-content-between mb-4">
        <div className="d-flex gap-3 align-items-center ">
          <img src="/note.png" alt="note" width={65} />
          <h1>NOTES</h1>
        </div>
        <Link to="/new">
          <Button variant="warning">CREATE</Button>
        </Link>
      </Stack>
      {/* Form Alanı */}
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Search by Title</Form.Label>
              <Form.Control onChange={(e) => setQuery(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Search by Tag</Form.Label>
              <ReactSelect
                onChange={(all_tags) => setSelectedTags(all_tags as Tag[])}
                isMulti
                className="text-black"
                options={availableTags}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {/* Not listesi*/}
      <Row xs={1} sm={2} lg={3} xl={4} className="mt-4 g-4">
        {filtredNotes.map((note) => (
          <Col>
            <Card key={note.id} note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Main;
