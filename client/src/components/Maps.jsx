import React from "react";
import "leaflet/dist/leaflet.css";
import s from "./ModulesCss/Maps.module.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

// import L from "leaflet";

// const iconVerde = new L.Icon({
//   iconUrl: require("./ModulesCss/descarga.png"),

//   iconSize: [40, 45], // tamaño del icono

//   shadowSize: [50, 64], // tamaño de la sombra

//   iconAnchor: [20, 40], // punto del icono que corresponde a la posición del marcador

//   popupAnchor: [0, -40], // punto relativo al marcador desde donde se deberá abrir el popup
// });

export default function Maps() {
  return (
    <MapContainer
      className={s.leaflet_container}
      center={[-31.417, -64.183]}
      zoom={10}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[-31.417, -64.183]}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      />
      {/* <Marker position={[-38.417, -64.183]}>
        <Tooltip direction="top" opacity={1}>
          <span> Tooltip del marcador de ejemplo </span>
        </Tooltip>
      </Marker> */}
    </MapContainer>
  );
}
