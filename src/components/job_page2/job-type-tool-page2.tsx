import type { JobTypeList } from '@/@types/jobs';
interface JobTypeTooltipProps {
  item: JobTypeList;
}

export default function JobTypeToolPage2({ item }: JobTypeTooltipProps) {
  const allTenChiTiet = item.dsNhomChiTietLoai;
  console.log('item', item);
  return (
    <div className='container'>
      <div className='py-2'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 group'>
          {allTenChiTiet.map((nhom) => (
            <div className=''>
              <div key={nhom.id} className='job-group transition-shadow duration-200 w-full h-[300px]'>
                <img
                  src={nhom.hinhAnh}
                  alt={nhom.tenNhom}
                  className='w-full h-[180px] mb-2 object-cover rounded-sm transition-transform duration-200'
                />
                <h2 className='font-semibold mb-2 group-hover:text-primary transition-colors duration-200 text-xl'>
                  {nhom.tenNhom}
                </h2>
                <ul className='list-inside text-base text-[#666767]  '>
                  {nhom.dsChiTietLoai.map((chiTiet) => (
                    <li
                      key={chiTiet.id}
                      className='group-hover:text-primary hover:bg-gray-100 mt-1 mb-1 transition-colors duration-200'
                    >
                      {chiTiet.tenChiTiet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
