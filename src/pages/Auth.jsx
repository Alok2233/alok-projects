import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                navigate("/admin");
            }
        });
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                navigate("/admin");
            }
        });
        return () => subscription.unsubscribe();
    }, [navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error)
                    throw error;
                toast.success("Logged in successfully!");
            }
            else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/admin`,
                    },
                });
                if (error)
                    throw error;
                toast.success("Account created! You can now log in.");
                setIsLogin(true);
            }
        }
        catch (error) {
            if (error.message.includes("User already registered")) {
                toast.error("This email is already registered. Please log in.");
                setIsLogin(true);
            }
            else if (error.message.includes("Invalid login credentials")) {
                toast.error("Invalid email or password.");
            }
            else {
                toast.error(error.message);
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Home className="w-6 h-6 text-primary-foreground"/>
          </div>
          <span className="text-2xl font-bold text-foreground">
            Real<span className="text-muted-foreground font-normal">Trust</span>
          </span>
        </Link>

        {/* Auth Card */}
        <div className="bg-card rounded-xl p-8 shadow-card">
          <h1 className="text-2xl font-bold text-center mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            {isLogin
            ? "Sign in to access the admin panel"
            : "Create an account to get started"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}/>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm text-primary hover:underline">
              {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>);
};
export default Auth;
