import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trackOrderById } from "../../services/orderService";
import NotFound from "../../components/NotFound/NotFound";
import classes from "./orderTrackPage.module.css";
import DateTime from "../../components/DateTime/DateTime";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";
import Title from "../../components/Title/Title";
import Map from "../../components/Map/Map";

export default function OrderTrackPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    orderId &&
      trackOrderById(orderId).then((order) => {
        setOrder(order);
      });
  }, []);

  if (!orderId)
    return (
      <NotFound message="Ordre inexistant" linkText="Retour à l'acceuil" />
    );

  return (
    order && (
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Ordre #{order.id}</h1>
          <div className={classes.header}>
            <div>
              <strong>Date</strong>
              <DateTime date={order.createdAt} />
            </div>
            <div>
              <strong>Nom</strong>
              {order.name}
            </div>
            <div>
              <strong>Addresse</strong>
              {order.address}
            </div>
            <div>
              <strong>Etat</strong>
              {order.status}
            </div>
            {order.paymentId && (
              <div>
                <strong>ID Payment</strong>
                {order.paymentId}
              </div>
            )}
          </div>

          <OrderItemsList order={order} />
        </div>

        <div>
          <Title title="Votre Localisation" fontSize="1.6rem" />
          <Map location={order.addressLatLng} readonly={true} />
        </div>

        {order.status === "NEW" && (
          <div className={classes.payment}>
            <Link to="/payment">Passer Au Payment</Link>
          </div>
        )}
      </div>
    )
  );
}
