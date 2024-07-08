import { useEffect, useRef, useState } from "react";
import {
  GeolocationControl,
  Placemark,
  YMaps,
  ZoomControl,
  Map,
} from "@pbe/react-yandex-maps";

import { getGeoLocation } from "../../services/yandexSerive";
import { getCurrentLocation } from "../../hooks/getCurrentLocation";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import cls from "./styles.module.scss";
import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUserOrder } from "../../store/order/order.slice";
import placemarkIcon from "/placemark.png";
import { apikey } from "../../services/yandexSerive";

export default function DeliveryMap({ control, setValue }) {
  const [placemark, setPlacemark] = useState([41.3113, 69.279773]);//41.3113, 69.279773
  const [address, setAddress] = useState("");
  const [zoom, setZoom] = useState(12);
  const [geolocationFetched, setGeolocationFetched] = useState(false);
  const mapRef = useRef();
  const dispatch = useDispatch();

// window.location.reload()


  // useEffect(() => {
  //   // Check if the page is not already reloading to prevent an infinite loop
  //   if (!window.location.reloading) {
  //     window.location.reloading = true; // Set a flag to indicate that the page is reloading
  //     window.location.reload();
  //   }
  // }, []);



  useEffect(() => {
    function success(pos) {
      const crd = pos.coords;
      setPlacemark([crd.latitude, crd.longitude]);
      setGeolocationFetched(true)
      // window.location.reload();
    }
    function error(prop) {
      console.log("ERROR => ", prop);
    }
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }, []);

  //webworker






  // Update address when placemark changes
useEffect(() => {
  if (geolocationFetched && placemark.length > 0) {
    getGeoLocation({ lat: placemark[1], long: placemark[0] }).then((res) => {
      if (res.response) {
        const newAddress = res.response.GeoObjectCollection.featureMember[0].GeoObject.name;
        console.log(newAddress);
        setAddress(newAddress); // Update address state
        setZoom(17);
        setValue("placemark", placemark);
        dispatch(
          setUserOrder({
            address: newAddress,
          })
        );
      }
    });
  }
}, [placemark]);

 

  

  useEffect(() => {
    const mapInstance = mapRef.current;

    const handleBoundsChange = () => {
      const newZoom = mapInstance.getZoom();
      setZoom(newZoom);
    };

    if (mapInstance) {
      mapInstance.events.add("boundschange", handleBoundsChange);
    }

    return () => {
      if (mapInstance) {
        mapInstance.events.remove("boundschange", handleBoundsChange);
      }
    };
  }, [mapRef]);

  return (
    <div className={cls.map}>
        <div className={cls.map__wrapper}>
          <p className={cls.adressP}>Manzil:</p>
          <div className={cls.place}>{address}</div>
          <PrimaryButton
            type="button"
            center
            classes={cls.get_location_btn}
            onClick={() => {
              setZoom(17);
              getCurrentLocation(setPlacemark);
            }}
          >
            Yetkazib berish manzilini belgilang
          </PrimaryButton>
      <YMaps
        query={{
          apikey: apikey,
          load: "util.bounds",
        }}
      >
          <Controller
            name="placemark"
            control={control}
            render={({ field }) => (
              <Map
                instanceRef={mapRef}
                width="100%"
                onClick={(e) => {
                  field.onChange(e.get("coords"));
                  setPlacemark(e.get("coords"));
                  setZoom(17);
                }}
                modules={["geocode", "geolocation"]}
                options={{ suppressMapOpenBlock: true, controls: [] }}
                state={{
                  center: placemark,
                  zoom: zoom,
                  controls: [],
                  behaviors: ["default", "scrollZoom"],
                }}
              >
                <GeolocationControl
                  options={{
                    position: {
                      top: 8,
                      right: 8,
                    },
                    size: "40px",
                  }}
                />
                <ZoomControl
                  options={{
                    position: {
                      bottom: 50,
                      right: 8,
                    },
                    size: "40px",
                    width: "40px",
                    height: "40px",
                    cornerRadius: "50%",
                  }}
                />
                <Placemark
                  geometry={placemark}
                  options={{
                    draggable: true,
                    iconLayout: "default#image",
                    iconImageHref: placemarkIcon,
                    iconImageSize: [50, 50],
                    iconImageOffset: [-25, -45],
                  }}
                  onDragEnd={(e) => {
                    const newCoords = e.get("target").geometry.getCoordinates();
                    setPlacemark(newCoords);
                    field.onChange(newCoords);
                  }}
                  onClick={(e) => {
                    const map = e.get("map");
                    map.setZoom(17);
                    map.setCenter(placemark);
                  }}
                />
              </Map>
           )} 
         /> 
      </YMaps>
        </div>
    </div>
  );
}
