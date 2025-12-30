import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe, LogOut, Loader2, User, FileText, CheckCircle2, Clock, Upload, AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    try {
      // Assuming GET /applications/me or filtering by user on backend
      // Using /applications for now and finding the user's application matching their email or id
      // Ideally the backend provides a direct endpoint for "my application"
      const res = await apiClient.get("/applications/my-application");
      setApplication(res.data.application);
    } catch (error) {
      if (error.response?.status === 404) {
        setApplication(null); // No application yet
      } else {
        console.error("Error fetching application:", error);
        // Silent fail or toast if critical
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!application) {
      toast.error("Please create an application first.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("application_id", application.id);
    formData.append("document_type", "client_upload"); // Or ask user to select type

    try {
      await apiClient.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Document uploaded successfully");
      fetchApplication();
    } catch {
      toast.error("Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      submitted: "bg-blue-50 text-blue-700 border-blue-200",
      under_review: "bg-amber-50 text-amber-700 border-amber-200",
      processing: "bg-purple-50 text-purple-700 border-purple-200",
      approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
      rejected: "bg-rose-50 text-rose-700 border-rose-200"
    };
    return colors[status] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar / Mobile Nav could be added here, for now using a top bar style for Client */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Globe className="w-6 h-6 text-teal-600" />
          <span className="font-heading text-lg font-bold text-slate-900">Glojourn Client Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">{user?.name}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-600">
            <LogOut className="w-4 h-4 mr-2" /> <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-6 md:p-8">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-slate-900">My Overview</h1>
          <p className="text-slate-600">Track your application and manage documents</p>
        </div>

        {/* Application Status Card */}
        {application ? (
          <div className="grid gap-6">
            <Card className="border-slate-200 shadow-sm border-t-4 border-t-teal-500">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Visa Application: {application.personal_details?.visa_type}</CardTitle>
                    <CardDescription>Destination: {application.personal_details?.destination_country}</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(application.status)} text-sm px-3 py-1`}>
                    {application.status.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4 text-sm mt-2">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    Submitted: {new Date(application.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 className="w-4 h-4" />
                    Last Update: {new Date(application.updated_at).toLocaleDateString()}
                  </div>
                  {application.assigned_manager && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <User className="w-4 h-4" />
                      Case Manager Assigned
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="documents" className="w-full">
              <TabsList className="w-full sm:w-auto grid grid-cols-2">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="messages">Messages / Requests</TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">My Documents</CardTitle>
                      <label htmlFor="doc-upload">
                        <Button asChild size="sm" className="cursor-pointer bg-slate-900 hover:bg-teal-700">
                          <span>
                            {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                            Upload New
                          </span>
                        </Button>
                      </label>
                      <input
                        id="doc-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={uploading}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {application.documents?.length > 0 ? (
                      <div className="grid gap-3">
                        {application.documents.map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-teal-600" />
                              <div>
                                <p className="font-medium text-sm text-slate-900">{doc.file_name}</p>
                                <p className="text-xs text-slate-500">{new Date(doc.uploaded_at || Date.now()).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">{doc.document_type || "Document"}</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                        <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
                        <p>No documents uploaded yet.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Communication</CardTitle>
                    <CardDescription>Messages from your case manager</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Placeholder for messages - Assuming backend could provide this later */}
                    <div className="flex items-center gap-3 p-4 bg-blue-50 text-blue-800 rounded-md">
                      <AlertCircle className="w-5 h-5" />
                      <p className="text-sm">No pending actions or new messages from your manager.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No Application Found</h2>
            <p className="text-slate-600 max-w-md mx-auto mb-6">You haven't started a visa application process yet. Start your journey today.</p>
            <Button className="bg-teal-600 hover:bg-teal-700">Start New Application</Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientDashboard;
