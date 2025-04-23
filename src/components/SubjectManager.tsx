
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Plus, Edit, Trash } from "lucide-react";

type Subject = {
  id: string;
  name: string;
  color: string;
  description: string;
  tasksCount: number;
  studyHours: number;
};

export function SubjectManager() {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: "1",
      name: "Mathematics",
      color: "bg-study-blue",
      description: "Calculus, Linear Algebra, Statistics",
      tasksCount: 5,
      studyHours: 12.5,
    },
    {
      id: "2",
      name: "Physics",
      color: "bg-study-purple",
      description: "Mechanics, Thermodynamics, Electromagnetism",
      tasksCount: 3,
      studyHours: 8.0,
    },
    {
      id: "3",
      name: "Literature",
      color: "bg-pink-400",
      description: "Poetry Analysis, Essay Writing, Modern Fiction",
      tasksCount: 2,
      studyHours: 6.5,
    },
    {
      id: "4",
      name: "Computer Science",
      color: "bg-green-400",
      description: "Algorithms, Data Structures, Web Development",
      tasksCount: 4,
      studyHours: 10.0,
    },
    {
      id: "5",
      name: "History",
      color: "bg-yellow-400",
      description: "World War II, Ancient Civilizations, Modern History",
      tasksCount: 1,
      studyHours: 3.5,
    },
  ]);

  const [newSubject, setNewSubject] = useState({
    name: "",
    color: "bg-blue-400",
    description: "",
  });

  const colorOptions = [
    { name: "Blue", value: "bg-study-blue" },
    { name: "Purple", value: "bg-study-purple" },
    { name: "Pink", value: "bg-pink-400" },
    { name: "Green", value: "bg-green-400" },
    { name: "Yellow", value: "bg-yellow-400" },
    { name: "Orange", value: "bg-orange-400" },
    { name: "Red", value: "bg-red-400" },
  ];

  const handleAddSubject = () => {
    if (newSubject.name.trim() === "") return;

    const newSubjectItem: Subject = {
      id: Date.now().toString(),
      name: newSubject.name,
      color: newSubject.color,
      description: newSubject.description || "No description",
      tasksCount: 0,
      studyHours: 0,
    };

    setSubjects([...subjects, newSubjectItem]);
    setNewSubject({
      name: "",
      color: "bg-blue-400",
      description: "",
    });
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Book className="h-6 w-6 text-study-purple" /> 
          Subject Manager
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-medium mb-4">Your Subjects</h3>
              {subjects.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No subjects found. Add some subjects to organize your studies!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block w-4 h-4 rounded-full ${subject.color}`}
                          ></span>
                          <h4 className="font-medium">{subject.name}</h4>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-gray-400 hover:text-study-blue transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSubject(subject.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {subject.description}
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{subject.tasksCount} tasks</span>
                        <span>{subject.studyHours} hours studied</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-medium mb-4">Add New Subject</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="subject-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject Name
                  </label>
                  <Input
                    id="subject-name"
                    placeholder="e.g., Biology"
                    value={newSubject.name}
                    onChange={(e) =>
                      setNewSubject({ ...newSubject, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label htmlFor="subject-description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Input
                    id="subject-description"
                    placeholder="Brief description of the subject"
                    value={newSubject.description}
                    onChange={(e) =>
                      setNewSubject({
                        ...newSubject,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() =>
                          setNewSubject({ ...newSubject, color: color.value })
                        }
                        className={`w-8 h-8 rounded-full ${
                          color.value
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                          newSubject.color === color.value
                            ? "ring-2 ring-offset-2 ring-blue-500"
                            : ""
                        }`}
                        title={color.name}
                      ></button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleAddSubject}
                  className="w-full bg-study-blue hover:bg-blue-600"
                  disabled={!newSubject.name.trim()}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Subject
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectManager;
