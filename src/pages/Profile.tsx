
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, LogOut, Book, Plus } from "lucide-react";
import { toast } from "sonner";

const ProfilePage = () => {
  // Mock user data (would be replaced with actual auth later)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [courses, setCourses] = useState<{ id: number; name: string; description: string }[]>([]);
  const [newCourse, setNewCourse] = useState({ name: '', description: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app would connect to Supabase or another auth provider
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
      setUserData({
        username: loginForm.email.split('@')[0],
        email: loginForm.email
      });
      toast.success("Successfully logged in!");
    } else {
      toast.error("Please enter email and password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ username: '', email: '' });
    setLoginForm({ email: '', password: '' });
    setCourses([]);
    toast.success("Successfully logged out!");
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourse.name) {
      setCourses([
        ...courses,
        { 
          id: Date.now(), 
          name: newCourse.name, 
          description: newCourse.description || 'No description'
        }
      ]);
      setNewCourse({ name: '', description: '' });
      toast.success("Course added successfully!");
    } else {
      toast.error("Please enter a course name");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto py-10 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
            <CardDescription className="text-center">Sign in to access your study profile</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <User size={48} />
              </div>
            </div>
            <CardTitle className="text-center">{userData.username}</CardTitle>
            <CardDescription className="text-center">{userData.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} /> Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* Courses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book size={20} /> My Courses
            </CardTitle>
            <CardDescription>Manage your study courses</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCourse} className="space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="course-name">New Course</Label>
                <Input 
                  id="course-name"
                  placeholder="Course name" 
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-description">Description (optional)</Label>
                <Input 
                  id="course-description"
                  placeholder="Course description" 
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full flex items-center gap-2">
                <Plus size={16} /> Add Course
              </Button>
            </form>

            <div className="space-y-4 mt-6">
              {courses.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No courses added yet. Add your first course above.
                </div>
              ) : (
                courses.map(course => (
                  <Card key={course.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
