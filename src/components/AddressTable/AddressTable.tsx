import React from 'react';
import AddressResult from './interface';

interface AddressTableProps {
  results: AddressResult[];
}

export const AddressTable: React.FC<AddressTableProps> = ({ results }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Endereço
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Latitude
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Longitude
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-black">
          {results.map((result, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                {result.formatted_address}
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                {result.geometry.location.lat}
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap">
                {result.geometry.location.lng}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


