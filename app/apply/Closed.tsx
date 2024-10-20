import React from "react";

const Closed = () => {
  return (
    <main className="w-full min-h-screen overflow-hidden relative py-36 fc justify-start">
      <div className="w-full min-h-screen max-w-5xl mx-auto fc justify-start items-start h-full gap-2 px-5 sm:px-10">
        <h1 className="text-4xl font-bold">Applications are closed</h1>
        <p className="text-lg">
          Thank you for your interest in applying to our hackathon.
          Unfortunately, applications are now closed. We hope to see you at
          Hack49 2025!
        </p>
        <p className="text-lg">
          If you have received an invite, please click on the link sent by your
          friend to automatically get accepted.
        </p>
      </div>
    </main>
  );
};

export default Closed;
