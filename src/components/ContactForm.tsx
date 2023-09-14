import {searchLocationByStreetName} from '@/pages/api/searchLocation';
import React from 'react';
import { useForm } from 'react-hook-form';

interface PdfFile {
  type: string;
}
interface IFormInput {
  Email: string
  Cidade: string;
  Nome: string;
  pdf: PdfFile[];
}
export const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value) || 'E-mail inválido';
  };

  const validatePdf = (value: PdfFile[]) => {
    return value[0] && value[0].type === 'application/pdf' || 'Insira um arquivo PDF válido';
  };

  return (
    <div className="container mx-auto bg-slate-800 rounded p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
              Nome
            </label>
            <input
              {...register('Nome', { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-900 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-nome"
              type="text"
              placeholder="Nome"
              aria-invalid={errors.Nome ? 'true' : 'false'}
            />
            {errors.Nome?.type === 'required' && (
              <p role="alert" className="text-red-500 mt-1">
                Nome Obrigatório
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
              E-mail
            </label>
            <input
              className='className="appearance-none block w-full bg-gray-200 text-gray-900 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"'
              id="email"
              {...register("Email", {
                required: "required",
                validate: validateEmail
              })}
              type="email"
            />
            {errors.Email?.type === 'required' && (
              <p role="alert" className="text-red-500 mt-1">
                E-mail Obrigatório
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2">
              Cidade
            </label>
            <input
              {...register('Cidade', { required: true })}
              className="appearance-none block w-full bg-gray-200 text-gray-900 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-cidade"
              type="text"
              placeholder="Cidade"
              aria-invalid={errors.Cidade ? 'true' : 'false'}
            />
            {errors.Cidade?.type === 'required' && (
              <p role="alert" className="text-red-500 mt-1">
                Cidade Obrigatória
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 ">

            <input
              {...register('pdf', {
                required: true,
                validate: validatePdf
              })}
              type="file"
              accept=".pdf"
              aria-invalid={errors.pdf ? 'true' : 'false'}
              className="block w-full text-sm text-gray-900 border  border-gray-300 rounded-lg cursor-pointer py-3 px-4 mb-3  mt-5 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
            {errors.pdf?.type === 'required' && (
              <p role="alert" className="text-red-500 mt-1">
                PDF Obrigatório
              </p>
            )}
            {errors.pdf?.type === 'validate' && (
              <p role="alert" className="text-red-500 mt-1">
                Insira um arquivo PDF válido
              </p>
            )}
          </div>
          <div className="w-full px-3">
            <button
              className="rounded bg-slate-300 py-3 px-4 font-medium"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );

};
