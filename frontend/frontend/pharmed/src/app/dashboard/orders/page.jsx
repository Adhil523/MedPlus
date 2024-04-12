"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Package,
  PanelLeft,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableRowComponent from "@/components/utils/Table";
import { getallOrders } from "@/lib/api";

const OrdersPage = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [medprice,setMedprice]=useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const orders = await getallOrders();
      console.log(orders);
      setAllOrders(orders);
    };
    fetchData();
  }, []);

  const order = [
    {
      patient: "Adam Joan",
      pharmacy: "Best Medicals",
      status: "Pending",
      medicines: [
        {
          drug: "Medicine 1",
          dosage: " ",
          quantity: " ",
          _id: {
            $oid: "66128809f378c67363c5980b",
          },
        },
        
      ],
      total: 0,
    },
    {
      patient: "Adam Joan",
      pharmacy: "Best Medicals",
      status: "Pending",
      medicines: [
        {
          drug: "Beta-blocker",
          dosage: "100 mg",
          quantity: "1 tab",
          _id: {
            $oid: "66128809f378c67363c5980b",
          },
        },
        {
          drug: "Doxazosin",
          dosage: "10 mg",
          quantity: "1 tab",
          _id: {
            $oid: "66128809f378c67363c5980c",
          },
        },
        {
          drug: "Cimetidine",
          dosage: "50 mg",
          quantity: "2 tabs",
          _id: {
            $oid: "66128809f378c67363c5980d",
          },
        },
        {
          drug: "Oxeprolol",
          dosage: "50 mg",
          quantity: "1 tab",
          _id: {
            $oid: "66128809f378c67363c5980e",
          },
        },
      ],
      total: 250,
    },
    {
      patient: "Henry Ford",
      pharmacy: "Best Medicals",
      status: "Pending",
      medicines: [
        {
          drug: "Paracetamol",
          dosage: "100 mg",
          quantity: "1 tab",
          _id: {
            $oid: "66128809f378c67363c5980b",
          },
        },
        {
          drug: "Doxazosin",
          dosage: "10 mg",
          quantity: "1 tab",
          _id: {
            $oid: "66128809f378c67363c5980c",
          },
        },
        {
          drug: "Cimetidine",
          dosage: "50 mg",
          quantity: "2 tabs",
          _id: {
            $oid: "66128809f378c67363c5980d",
          },
        },
        {
          drug: "Oxeprolol",
          dosage: "50 mg",
          quantity: "1 tab",
          _id: {
            $oid: "66128809f378c67363c5980e",
          },
        },
      ],
      total: 250,
    },
  ];
  const [orderdet, setOrderdet] = useState(order[0]);

  console.log(orderdet);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                Orders
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Products
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Orders</CardTitle>
              <CardDescription>Recent orders from your store.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    {/* <TableHead className="hidden sm:table-cell">Type</TableHead> */}
                    <TableHead className="hidden sm:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allOrders && allOrders.map((e, index) => {
                    return (
                      <TableRowComponent
                        order={e}
                        key={index}
                        setfunction={setOrderdet}
                      ></TableRowComponent>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Order #4332423
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </CardTitle>
                <CardDescription>Date: November 23, 2023</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Order Details</div>
                <ul className="grid gap-3">
                  
                  {orderdet
                    && orderdet.medicines.map((e, index) => {
                         // make e.quantity a integer from data list
                        return (
                          <li
                            className="flex items-center justify-between"
                            key={index}
                          >
                            <span className="text-muted-foreground">
                              {e.drug} {e.dosage} x <span>{e.quantity}</span>
                            </span>
                            <span>{e.price}</span>
                          </li>
                        );
                      })
                    }
                  {/* <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Glimmer Lamps x <span>2</span>
                    </span>
                    <span>$250.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Aqua Filters x <span>1</span>
                    </span>
                    <span>$49.00</span>
                  </li> */}
                </ul>
                <Separator className="my-2" />
                <ul className="grid gap-3">
                  {/* <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>$299.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$5.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>$25.00</span>
                  </li> */}
                  <li className="flex items-center justify-between font-semibold">
                    <span className="text-muted-foreground">Total</span>
                    <span>{orderdet.total}</span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  {/* <div className="font-semibold">Shipping Information</div>
                  <address className="grid gap-0.5 not-italic text-muted-foreground">
                    <span>Liam Johnson</span>
                    <span>1234 Main St.</span>
                    <span>Anytown, CA 12345</span>
                  </address> */}
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold">Billing Information</div>
                  <div className="text-muted-foreground">
                    Same as shipping address
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Customer Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Customer</dt>
                    <dd>{orderdet.patient}</dd>
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href="mailto:">liam@acme.com</a>
                    </dd>
                  </div> */}
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                      <a href="tel:">8621621890</a>
                    </dd>
                  </div>
                </dl>
              </div>
              <Separator className="my-4" />
              {/* <div className="grid gap-3">
                <div className="font-semibold">Payment Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                      Visa
                    </dt>
                    <dd>**** **** **** 4532</dd>
                  </div>
                </dl>
              </div> */}
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                Updated <time dateTime="2023-11-23">November 23, 2023</time>
              </div>
              <Pagination className="ml-auto mr-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <Button size="icon" variant="outline" className="h-6 w-6">
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span className="sr-only">Previous Order</span>
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button size="icon" variant="outline" className="h-6 w-6">
                      <ChevronRight className="h-3.5 w-3.5" />
                      <span className="sr-only">Next Order</span>
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
