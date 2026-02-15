import Image from 'next/image';

export function TrustBadges() {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
      <h4 className="font-semibold mb-3">Trusted by 50,000+ students</h4>
      <div className="flex justify-center gap-4 flex-wrap">
        <Image src="/badges/google.svg" alt="Google" width={60} height={30} />
        <Image src="/badges/microsoft.svg" alt="Microsoft" width={60} height={30} />
        <Image src="/badges/amazon.svg" alt="Amazon" width={60} height={30} />
        <Image src="/badges/nasscom.svg" alt="Nasscom" width={60} height={30} />
      </div>
      <p className="text-xs text-gray-500 mt-2">Partnered with top companies for internships</p>
    </div>
  );
}
