"use client";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { USERROLE } from "@prisma/client";
import { useTransition } from "react";
import { useState } from "react";
import getData from "@/actions/getDataForAdmin";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
const AdminPage = () => {
  const currentUser = useCurrentUser();
  const [pending, startTransition] = useTransition();
  const [show, setShow] = useState(false);
  const [showerr, seterrShow] = useState(false);
  const [showmsg, setShowmsg] = useState(false);
  const [showerrmsg, seterrShowmsg] = useState(false);
  const [info, setInfo] = useState<undefined | { data: string }>();
  const sendRequest = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        setShowmsg(true);
      } else {
        seterrShowmsg(true);
      }
    });
  };
  const data = () => {
    setShow(true);
    startTransition(() => {
      getData()
        .then((res: { data: string; status: string }) => {
        
          if (res.status == "200") setInfo(res);
          else seterrShow(true);
        })
        .catch((err) => {
          seterrShow(true);
        });
    });
  };
  return (
    <div>
      {currentUser?.role == USERROLE.ADMIN ? (
        <div>
          <h2 className="text-center text-2xl font-semibold">Welcome admin</h2>
          <div className="">
            <div className=" flex border p-3 rounded-md bg-white text-black max-w-lg  mx-auto flex-col gap-y-3">
              <h2 className="text-xl font-semibold">Using server Actions</h2>
              <div>Click to send a request and access your content </div>
              <Button variant={"default"} onClick={data} className="w-full">
                Click
              </Button>
              {show && (
                <div>
                  {pending ? (
                    "Loading"
                  ) : (
                    <div>
                      <FormSuccess message={info?.data} />
                      {showerr && <FormError message="Error fetching" />}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex p-4 bg-white text-black flex-col max-w-lg mx-auto gap-y-3">
            <h2 className="text-xl font-semibold">Using Api route</h2>
            <Button onClick={sendRequest} variant={"outline"}>
              Send
            </Button>
            {showmsg && <FormSuccess message="You are in" />}
            {showerrmsg && <FormError message="You are out" />}
          </div>
        </div>
      ) : (
        "Now Allowed"
      )}
    </div>
  );
};
export default AdminPage;
