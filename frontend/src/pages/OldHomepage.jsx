import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../lib/axios";

const HomePage = () => {
  const { authUser } = useSelector((slice) => slice.auth);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axiosInstance.get("/sos/getall");
        setMessages(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    getData();
  }, []);

  return (
    <div className="h-full w-full bg-zinc-700 text-white">
      <div className="flex items-center justify-center pt-20 px-4">
        <h1>Welcome {authUser?.fullname}</h1>
      </div>

      <div className="p-6">
        {messages && messages.length > 0 ? (
          <ul className="space-y-4">
            {messages.map((msg, index) => (
              <li key={index} className="p-4 bg-gray-800 rounded-lg">
                {msg.text && <p className="mb-2">{msg.text}</p>}

                {msg.audio && (
                  <audio controls>
                    <source
                      src={`data:audio/wav;base64,${msg.audio}`}
                      type="audio/wav"
                    />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
