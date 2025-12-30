import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("individual");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const path = user.role === "client" ? "/dashboard" :
        user.role === "coordinator" ? "/coordinator" :
          user.role === "manager" ? "/manager" : "/admin";
      navigate(path, { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      // For now mapping both individual and company to 'client' role
      const userData = await signup(email, password, name, "client");
      toast.success(`Welcome to Glojourn, ${userData.name}!`);
      const path = userData.role === "client" ? "/dashboard" :
        userData.role === "coordinator" ? "/coordinator" :
          userData.role === "manager" ? "/manager" : "/admin";
      navigate(path);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient items-center justify-center p-12 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565688527174-775059ac429c?w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="w-10 h-10 text-teal-400" />
            <span className="font-heading text-3xl font-bold text-white">Glojourn</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-white mb-4 tracking-tight">
            Start Your Journey
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Create your account to begin your visa application process with expert guidance every step of the way.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8 text-slate-600 hover:text-slate-900"
            data-testid="back-to-home-btn"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>

          <Card className="border-slate-200 shadow-lg">
            <CardHeader className="space-y-1">
              <div className="lg:hidden flex items-center gap-2 mb-4">
                <Globe className="w-8 h-8 text-teal-600" />
                <span className="font-heading text-xl font-bold text-slate-900">Glojourn</span>
              </div>
              <CardTitle className="font-heading text-2xl">Create Account</CardTitle>
              <CardDescription>Fill in your details to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select value={accountType} onValueChange={setAccountType}>
                    <SelectTrigger className="h-12 bg-slate-50" data-testid="signup-account-type-select">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">{accountType === 'company' ? 'Company Name' : 'Full Name'}</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={accountType === 'company' ? "Acme Corp" : "John Doe"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 bg-slate-50"
                    data-testid="signup-name-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-slate-50"
                    data-testid="signup-email-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-slate-50"
                    data-testid="signup-password-input"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-slate-900 hover:bg-teal-700"
                  disabled={loading}
                  data-testid="signup-submit-btn"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
                </Button>
              </form>
              <p className="text-center text-sm text-slate-600 mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-teal-600 hover:text-teal-700 font-medium" data-testid="login-link">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
