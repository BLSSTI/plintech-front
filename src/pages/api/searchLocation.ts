export const searchLocationByStreetName = async (streetName:string) => {
    const apiKey = process.env.NEXT_PUBLIC_MAPS_KEY

    try {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(streetName)}&key=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json(); 
      if (data.status === 'OK') {
        const results = data.results;
        return results;
      } else {
        throw new Error(`Erro na busca de locais: ${data.status}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erro na solicitação HTTP: ${error.message}`);
      } else {
        throw new Error('Erro desconhecido na solicitação HTTP');
      }
    }
  };
  
