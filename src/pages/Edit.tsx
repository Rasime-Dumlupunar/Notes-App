import { useOutletContext } from "react-router-dom";
import { Note, NoteData, Tag } from "./types";
import { Container } from "react-bootstrap";
import CustomForm from "../components/Form/index";
import { create } from "../../node_modules/property-information/lib/util/create";

type Props = {
  handleSubmit: (id: string, updatedData: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const Edit = ({ handleSubmit, createTag, availableTags }: Props) => {
  const note = useOutletContext<Note>();
  return (
    <Container className="py-5 mx-auto">
      <h1>Notu Düzenle</h1>
      <CustomForm
        handleSubmit={(updatedData) => handleSubmit(note.id, updatedData)}
        createTag={createTag}
        availableTags={availableTags}
        title={note.title}
        tags={note.tags}
        markdown={note.markdown}
      />
    </Container>
  );
};

export default Edit;
