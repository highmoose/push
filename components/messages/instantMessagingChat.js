"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Apple,
  ChartPie,
  Dumbbell,
  NotebookPen,
  SendHorizonal,
} from "lucide-react";
import { useSelector } from "react-redux";

const ChartClient = dynamic(
  () => import("@/components/common/chart/ChartClient"),
  {
    ssr: false,
  }
);

export default function InstantMessagingChat({
  user,
  messages,
  authUserId,
  engagement,
  message,
  onChange,
  onSend,
}) {
  const textAreaRef = useRef(null);
  const messagesEndRef = useRef(null);

  // const [chartHovered, setChartHovered] = useState(false);

  const handleInputChange = (e) => {
    onChange(e);

    const el = textAreaRef.current;
    if (el) {
      el.style.height = "auto"; // Reset
      el.style.height = el.scrollHeight + "px"; // Expand to fit
      el.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const chartOptions = {
    chart: { id: "basic-bar", toolbar: { show: false } },
    legend: { show: false },
    grid: {
      padding: { top: -20, bottom: -20, left: 1, right: 10 },
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: false } },
    },
    colors: ["#EEEEEE", "#FF4560"],
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex items-center w-full  gap-4">
      <div className="flex flex-col gap-1 w-[400px] h-[770px]">
        <div className="flex-1 flex flex-col h-full bg-zinc-200 pt-4 px-4 rounded-lg">
          {/* Header */}
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-4 w-full mb-4">
              <div className="relative rounded-full bg-zinc-300 w-14 h-14 overflow-hidden">
                <Image
                  src={user.avatar}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                  className="p-0.5 mt-1"
                />
              </div>
              <div>
                <p className="font-semibold text-lg text-zinc-900">
                  {user.name}
                </p>
                <p className="text-sm font-extralight text-zinc-900 -mt-2">
                  {user.gym}
                </p>
                <p className="text-xs font-extralight text-zinc-900">
                  {user.lastActive}
                </p>
              </div>
            </div>
            <div className="flex gap-1 text-zinc-400">
              <div className="flex flex-col gap-1 ">
                <IconButton icon={<ChartPie size={20} />} />
                <IconButton icon={<Apple size={20} />} />
              </div>
              <div className="flex flex-col gap-1">
                <IconButton icon={<Dumbbell size={20} />} />
                <IconButton icon={<NotebookPen size={20} />} />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-2 flex-1 max-h-[510px]">
            <div
              ref={messagesEndRef}
              className="flex-1 w-full mb-1 overflow-y-scroll"
            >
              {messages.map((msg, index) => {
                const isMe = msg.sender_id === authUserId;

                return (
                  <div
                    key={index}
                    className={`flex ${isMe ? "flex-row-reverse" : ""} p-2`}
                  >
                    <div
                      className={`${
                        isMe
                          ? "bg-zinc-100 text-zinc-800 ml-auto"
                          : "bg-zinc-300 text-black mr-auto"
                      } px-4 py-2 rounded-lg max-w-xs text-[15px] leading-tight`}
                    >
                      {msg.content}
                      {/* {msg.pending && (
                        <span className="text-xs text-zinc-500 ml-2">
                          (sending...)
                        </span>
                      )} */}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative">
              <textarea
                ref={textAreaRef}
                value={message}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    console.log("🟢 Enter key pressed. Sending:", message);
                    onSend();
                  }
                }}
                rows={1}
                className="max-h-40 w-full overflow-hidden border-t border-zinc-300 resize-none p-2 text-black placeholder:text-black/30 placeholder:text-sm text-sm focus:outline-none"
                placeholder="Type a message..."
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (message.trim()) {
                    console.log("🟢 Send clicked with:", message);
                    onSend();
                  }
                }}
                type="button"
                className="cursor-pointer "
              >
                <SendHorizonal
                  size={20}
                  className="absolute bottom-2 right-2 text-zinc-800"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="p-8 bg-zinc-900 rounded-lg">
          <ChartClient
            options={chartOptions}
            series={engagement}
            type="line"
            height={60}
          />

          <div className="flex justify-between">
            <p className="text-xs font-bold text-zinc-500">Engagement</p>
            <div className="flex items-center gap-2">
              <Dot colour="#FF4560" label="You" />
              <Dot colour="#EEEEEE" label="Client" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponents
function IconButton({ icon }) {
  return (
    <div className="flex items-center justify-center h-[29px] w-[29px] rounded hover:bg-zinc-300 hover:shadow-inner">
      {icon}
    </div>
  );
}

function Dot({ colour, label }) {
  return (
    <>
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: colour }}
      ></div>
      <p className="text-xs text-zinc-500">{label}</p>
    </>
  );
}
