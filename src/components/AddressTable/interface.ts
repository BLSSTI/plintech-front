interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }
  
  interface Location {
    lat: number;
    lng: number;
  }
  
  interface Geometry {
    bounds: {
      northeast: Location;
      southwest: Location;
    };
    location: Location;
    location_type: string;
    viewport: {
      northeast: Location;
      southwest: Location;
    };
  }
  
  interface AddressResult {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    types: string[];
  }
  
  export default AddressResult;