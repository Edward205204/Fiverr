interface GigCardProps {
  tenCongViec: string;
  hinhAnh: string;
  saoCongViec: number;
  danhGia: number;
  giaTien: number;
}

export default function GigCard({ tenCongViec, hinhAnh, saoCongViec, danhGia, giaTien }: GigCardProps) {
  return (
    <div className='w-full rounded-xl overflow-hidden shadow-md border text-sm font-sans'>
      <div className='relative w-full pt-[100%] bg-gray-100'>
        <img src={hinhAnh} alt={tenCongViec} className='absolute top-0 left-0 w-full h-full object-cover' />
      </div>

      <div className='p-3'>
        <div className='text-gray-800 font-medium mb-1 line-clamp-2'>{tenCongViec}</div>
        <div className='flex items-center text-yellow-500 text-xs mb-1'>
          ★ {saoCongViec.toFixed(1)}
          <span className='text-gray-500 ml-1'>({danhGia})</span>
        </div>
        <div className='text-xs text-gray-500'>
          STARTING AT <span className='text-black font-semibold'>${giaTien}</span>
        </div>
      </div>
    </div>
  );
}
