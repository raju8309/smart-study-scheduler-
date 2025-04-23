
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6 text-study-purple" /> 
          Settings
        </h2>
      </div>

      <div className="max-w-2xl bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-6">Application Settings</h3>

          <div className="space-y-6">
            <div className="border-b pb-4">
              <h4 className="text-md font-medium mb-3">Notifications</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Timer Notifications</p>
                    <p className="text-sm text-gray-500">Get notified when timers complete</p>
                  </div>
                  <Switch defaultChecked id="timer-notifications" />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Task Reminders</p>
                    <p className="text-sm text-gray-500">Receive reminders for upcoming tasks</p>
                  </div>
                  <Switch defaultChecked id="task-reminders" />
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <h4 className="text-md font-medium mb-3">Pomodoro Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Focus Duration (minutes)</label>
                  <Input type="number" defaultValue="25" min="1" max="60" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Short Break (minutes)</label>
                  <Input type="number" defaultValue="5" min="1" max="30" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Long Break (minutes)</label>
                  <Input type="number" defaultValue="15" min="5" max="60" className="w-full" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium mb-3">Data Management</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Export Data</p>
                  <p className="text-sm text-gray-500 mb-2">Download all your tasks and study sessions</p>
                  <Button variant="outline" size="sm">Export as CSV</Button>
                </div>
                
                <div>
                  <p className="font-medium text-red-500">Reset Application</p>
                  <p className="text-sm text-gray-500 mb-2">Delete all data and reset to defaults</p>
                  <Button variant="destructive" size="sm">Reset All Data</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
