import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col flex-wrap items-center justify-center w-full min-h-[60vh] px-4">
      <div className="relative flex flex-col items-center justify-center gap-6">
        {/* The logo with a slow spin and a subtle pulse on the container */}
        <div className="animate-pulse">
          <Image
            src="/carbon.png"
            alt="..."
            width={80}
            height={80}
            className="object-cover rounded-2xl animate-[spin_3s_linear_infinite] shadow-[0_0_20px_rgba(159,232,112,0.2)]"
            priority
          />
        </div>
        <p
          className="text-sm font-bold tracking-widest uppercase animate-pulse"
          style={{ color: "#9fe870" }}
        >
        </p>
      </div>
    </div>
  );
}