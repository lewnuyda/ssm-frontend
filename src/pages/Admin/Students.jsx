import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import AppButton from "../../components/UI/AppButton";
import CustomModal from "../../components/UI/CustomModal";
import FormWrapper from "../../components/UI/FormWrapper";
import TextInput from "../../components/UI/TextInput";
import Datatable from "../../components/UI/Datatable";
import axiosInstance from "../../api/axiosInstance";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const Students = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    reset(); // ✅ Clears all input values AND validation messages
  };

  // --- Yup Validation Schema ---
  const validationSchema = Yup.object().shape({
    student_number: Yup.string().required("Student Number is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    grade_level: Yup.string().required("Grade Level is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    status: Yup.string().required("Status is required"),
  });

  // --- React Hook Form ---
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // --- Fetch students ---
  const fetchStudents = async () => {
    try {
      const res = await axiosInstance.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // --- Open modal in edit mode ---
  const handleEditStudent = (student) => {
    setEditingStudentId(student.id);
    // Populate form values
    Object.keys(student).forEach((key) => setValue(key, student[key]));
    setIsModalOpen(true);
  };

  // --- Form submit ---
  const onSubmit = async (data) => {
    try {
      if (editingStudentId) {
        await axiosInstance.put(`/students/${editingStudentId}`, data);
        alert("Student updated successfully!");
      } else {
        await axiosInstance.post("/students", data);
        alert("Student added successfully!");
      }

      toggleModal();
      setEditingStudentId(null);
      reset();
      fetchStudents();
    } catch (err) {
      console.error("Failed to save student:", err);
      alert("Failed to save student. Please try again.");
    }
  };

  // --- React Table Columns ---
  const columns = [
    { header: "Student Number", accessorKey: "student_number" },
    { header: "First Name", accessorKey: "first_name" },
    { header: "Last Name", accessorKey: "last_name" },
    { header: "Grade Level", accessorKey: "grade_level" },
    { header: "Email", accessorKey: "email" },
    { header: "Status", accessorKey: "status" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <AppButton
          color="green"
          className="px-2 py-1 text-sm"
          onClick={() => handleEditStudent(row.original)}
        >
          Edit
        </AppButton>
      ),
    },
  ];

  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const customTableBody = table.getRowModel().rows.map((row) => (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="p-4 border-b text-center">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  ));

  const PaginationButtons = ({ table, totalRecords }) => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex;

    const pages = Array.from({ length: totalPages }, (_, i) => i);

    return (
      <div className="flex flex-col items-center gap-2 mt-3">
        {/* Display total students */}
        <p className="text-sm text-gray-700">Total Students: {totalRecords}</p>

        {/* Pagination buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            {"<"}
          </button>

          {pages.map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => table.setPageIndex(pageIndex)}
              className={`px-3 py-1 border rounded ${
                pageIndex === currentPage
                  ? "bg-blue-500 text-white border-blue-600"
                  : "hover:bg-gray-200"
              }`}
            >
              {pageIndex + 1}
            </button>
          ))}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(totalPages - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            {">>"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-6 px-4 space-y-6">
      <AppButton color="blue" onClick={() => setIsModalOpen(true)}>
        Add Student
      </AppButton>

      <Datatable
        title="Students List"
        columns={columns.map((c) => c.header)}
        customTableBody={customTableBody}
        showPagination={true}
        paginationComponent={
          <PaginationButtons table={table} totalRecords={students.length} />
        }
      />

      <CustomModal
        open={isModalOpen}
        handler={toggleModal}
        header={editingStudentId ? "Edit Student" : "Add Student"}
        footer={
          <div className="flex justify-end gap-2">
            <AppButton color="gray" onClick={toggleModal}>
              Cancel
            </AppButton>
            <AppButton type="submit" form="student-form" color="blue">
              Save
            </AppButton>
          </div>
        }
      >
        <FormWrapper id="student-form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Student Number"
            {...register("student_number")}
            error={!!errors.student_number}
            errorMessage={errors.student_number?.message}
          />
          <TextInput
            label="First Name"
            {...register("first_name")}
            error={!!errors.first_name}
            errorMessage={errors.first_name?.message}
          />
          <TextInput
            label="Last Name"
            {...register("last_name")}
            error={!!errors.last_name}
            errorMessage={errors.last_name?.message}
          />
          <TextInput
            label="Grade Level"
            {...register("grade_level")}
            error={!!errors.grade_level}
            errorMessage={errors.grade_level?.message}
          />
          <TextInput
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <TextInput
            label="Status"
            {...register("status")}
            error={!!errors.status}
            errorMessage={errors.status?.message}
          />
        </FormWrapper>
      </CustomModal>
    </div>
  );
};

export default Students;
