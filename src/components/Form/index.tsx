import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Tag } from "../../pages/types";
import { v4 } from "uuid";
import { CreateProps } from "../../pages/Create";
import Markdown from "react-markdown";

const CustomForm = ({
  createTag,
  handleSubmit,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: CreateProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const navigate = useNavigate();

  // form gönderilince çalışır
  const handleForm = (e: FormEvent) => {
    e.preventDefault();

    const title = inputRef.current?.value || "";
    const markdown = textRef.current?.value as string;

    // yeni oluşturulan etiketi state/locale kaydet
    handleSubmit({
      title,
      markdown,
      tags: selectedTags,
    });
    //anasayfaya yönlendir
    navigate("/");
  };
  return (
    <Form onSubmit={handleForm} className="my-5">
      <Row>
        {/* Başlık - Etiket inputu*/}
        <Col>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control defaultValue={title} ref={inputRef} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Tag</Form.Label>
            <ReactSelect
              isMulti
              options={availableTags}
              className="text-black"
              value={selectedTags}
              onChange={(allTags) => setSelectedTags(allTags as Tag[])}
              onCreateOption={(text: string) => {
                //etiket nesnesi oluştur
                const newTag: Tag = { label: text, value: v4() };
                //locale kaydet
                createTag(newTag);
                //seçili etiketler state'ine ekle
                setSelectedTags([...selectedTags, newTag]);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      {/* Başlık - Etiket inputu*/}
      <Form.Group className="mt-5 ">
        <Form.Label>Content (Supports Markdown.)</Form.Label>
        <Form.Control
          defaultValue={markdown}
          ref={textRef}
          as="textarea"
          style={{ minHeight: "300px", maxHeight: "500px" }}
        />
      </Form.Group>

      {/* Buttonlar */}
      <Stack
        direction="horizontal"
        className="justify-content-end mt-5"
        gap={4}
      >
        <Link to={".."}>
          <Button type="button" variant="danger">
            Back
          </Button>
        </Link>
        <Button type="submit" variant="warning">
          Save
        </Button>
      </Stack>
    </Form>
  );
};

export default CustomForm;
