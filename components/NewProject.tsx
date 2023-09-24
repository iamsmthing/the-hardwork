"use client";
import { createNewProject } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";

Modal.setAppElement("#modal");

const NewProject = () => {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createNewProject(name);
    closeModal();
    router.refresh();
  };

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button className="rounded-2xl" onClick={() => openModal()}>
        Create New Project +
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form className="flex items-center" onSubmit={handleSubmit}>
          <Input
            className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
            placeholder="project name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          <Button>Create</Button>
        </form>
      </Modal>
    </div>
  );
};

export default NewProject;
