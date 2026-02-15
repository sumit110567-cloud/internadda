import Image from 'next/image';

export function TrustBadges() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
      <h4 className="font-bold text-gray-900 mb-4">Trusted by 72,000+ students</h4>
      <div className="flex justify-center gap-6 flex-wrap">
        <Image src="/company3.jpg" alt="MSME" width={60} height={30} className="opacity-80 hover:opacity-100 transition" />
        <Image src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Tracxn_Logo.png?20150621095748" alt="Teacxn" width={60} height={30} className="opacity-80 hover:opacity-100 transition" />
        <Image src="/company2.jpg" alt="LAREX" width={60} height={30} className="opacity-80 hover:opacity-100 transition" />

      </div>
      <p className="text-xs text-gray-400 mt-4">Global Recognition</p>
    </div>
  );
}
