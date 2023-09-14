import { searchLocationByStreetName } from '@/pages/api/searchLocation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AddressTable } from './AddressTable/AddressTable';
import AddressResult from './AddressTable/interface';
interface IFormInput {
  Endereco: string;
}
const SearchAddress = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();

  const [searchResults, setSearchResults] = React.useState<AddressResult[]>([]);

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    try {
      const res = await searchLocationByStreetName(data.Endereco);
      setSearchResults(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto bg-slate-800 rounded p-5">
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
              Endereço
            </label>
            {errors.Endereco?.type === "required" && (
              <p role="alert" className="text-red-500 mt-1">
                Endereço Obrigatório
              </p>
            )}
            <input
              {...register("Endereco", { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-900 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Endereço"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 flex items-end">
            <button className="rounded bg-slate-500 py-3 px-4 font-medium" type="submit">
              Buscar
            </button>
          </div>
        </div>
      </form>

      {searchResults.length > 0 && (
        <AddressTable results={searchResults} />
      )}
    </div>
  );
};

export default SearchAddress;
