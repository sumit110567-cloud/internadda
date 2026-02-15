import Image from 'next/image';

export function TrustBadges() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
      <h4 className="font-bold text-gray-900 mb-4">Trusted by 50,000+ students</h4>
      <div className="flex justify-center gap-6 flex-wrap">
        <Image src="/badges/google.svg" alt="Google" width={60} height={30} className="opacity-80 hover:opacity-100 transition" />
        <Image src="/badges/microsoft.svg" alt="Microsoft" width={60} height={30} className="opacity-80 hover:opacity-100 transition" />
        <Image src="/badges/amazon.svg" alt="Amazon" width={60} height={30} className="opacity-80 hover:opacity-100 transition" />
        <Image src="/badges/nasscom.svg" alt="Nasscom" width={60} height={30} className="opacity-80 hover:opacity-100 transition" />
      </div>
      <p className="text-xs text-gray-400 mt-4">Partnered with top companies for internships</p>
    </div>
  );
}
