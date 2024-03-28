import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import Link from "next/link";
const ErrorCardComponent = () => {
  return (
    <>
      <Card className="w-[400px]  mx-auto ">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>
            Please head back to login page and try again
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/login">
            <Button className="btn-primary" variant={"destructive"}>
              Login Page
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};
export default ErrorCardComponent;
