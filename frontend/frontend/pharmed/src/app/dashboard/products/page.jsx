"use client";

import { TableCell, Table } from "@/components/ui/table";
import {
  getAllPatientOrders,
  patientPrescriptionDelete,
  getAllMedicine,
  addmedicinetoPrescription,
  getMediaUrl,
  downloadMedia,
  fetchImage,
  createOrder,
} from "@/lib/api";
import { useState } from "react";
import { LucideEye } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";

const ProductsPage = () => {
  const [allPresriptions, setAllPrescriptions] = useState([]);
  const [allMedicine, setAllMedicine] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const orders = await getAllPatientOrders();
      const medicine = await getAllMedicine();
      setAllMedicine(medicine);
      console.log(orders);
      setAllPrescriptions(orders);
    };
    fetchData();
  }, []);

  const handlePrescriptionDelete = async (prescriptionId, medicineId) => {
    await patientPrescriptionDelete(prescriptionId, medicineId);
    const orders = await getAllPatientOrders();
    setAllPrescriptions(orders);
  };

  const handleAddMedicine = async (prescriptionId, medicineId) => {
    await addmedicinetoPrescription(prescriptionId, medicineId);
    const orders = await getAllPatientOrders();
    setAllPrescriptions(orders);
  };

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tablet </TableHead>
                    <TableHead>Medicine</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allPresriptions &&
                    allPresriptions.length > 0 &&
                    allPresriptions.map((prescription) => (
                      <TableRow key={prescription._id}>
                        <TableCell>{prescription.patient.name}</TableCell>
                        <TableCell>
                          {prescription.prescription
                            .map((item) => item.drug)
                            .join(", ")}
                        </TableCell>
                        <TableCell>
                          {prescription.prescription
                            .map((item) => item.dosage)
                            .join(", ")}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <LucideEye size={20} />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-1/2">
                              <Image
                                src={"/images/prescription.jpeg"}
                                alt="Prescription"
                                width={500}
                                className="w-full"
                                height={500}
                              />
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button>Modify</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Edit prescription</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 ">
                                <div className="grid grid-cols-1 ">
                                  <div className="w-full flex items-center gap-4 py-4 ">
                                    <div className="w-3/4">
                                      {allMedicine.length > 0 && (
                                        <Popover
                                          open={open}
                                          onOpenChange={setOpen}
                                        >
                                          <PopoverTrigger asChild>
                                            <Button
                                              variant="outline"
                                              role="combobox"
                                              aria-expanded={open}
                                              className="w-full justify-between"
                                            >
                                              {value
                                                ? allMedicine.find(
                                                    (item) => item._id === value
                                                  ).name
                                                : "Select medicine"}
                                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-full p-0">
                                            <Command>
                                              <CommandInput placeholder="Search" />
                                              <CommandEmpty>
                                                No results found
                                              </CommandEmpty>
                                              <CommandGroup>
                                                <CommandList>
                                                  {allMedicine.map((item) => (
                                                    <CommandItem
                                                      key={item._id}
                                                      value={item._id}
                                                      onSelect={(
                                                        currentValue
                                                      ) => {
                                                        setValue(
                                                          currentValue === value
                                                            ? ""
                                                            : currentValue
                                                        );
                                                        setOpen(false);
                                                      }}
                                                    >
                                                      <Check
                                                        className={`${
                                                          value === item._id
                                                            ? "text-primary"
                                                            : "text-transparent"
                                                        }`}
                                                      />
                                                      {item.name}
                                                    </CommandItem>
                                                  ))}
                                                </CommandList>
                                              </CommandGroup>
                                            </Command>
                                          </PopoverContent>
                                        </Popover>
                                      )}
                                    </div>
                                    <div className="w-1/4 text-right">
                                      <Button
                                        className="col"
                                        aria-label="Add"
                                        onClick={() => {
                                          if (value) {
                                            handleAddMedicine(
                                              prescription._id,
                                              value
                                            );
                                            setValue("");
                                          }
                                        }}
                                      >
                                        Add
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center py-2">
                                    <div className="col-span-2 font-bold">
                                      Medicine Name
                                    </div>
                                    <div className="col-span-1 text-center font-bold">
                                      Dosage
                                    </div>
                                    <div className="col-span-1 text-center font-bold"></div>
                                  </div>
                                  {prescription.prescription.length > 0 &&
                                    prescription.prescription.map((item) => (
                                      <div
                                        key={item._id}
                                        className="grid grid-cols-4 items-center py-2"
                                      >
                                        <div className="col-span-2">
                                          {item.drug}
                                        </div>
                                        <div className="col-span-1 text-center">
                                          {item.dosage}
                                        </div>
                                        <div className="col-span-1 text-center">
                                          <Button
                                            variant="primary"
                                            onClick={() =>
                                              handlePrescriptionDelete(
                                                prescription._id,
                                                item._id
                                              )
                                            }
                                          >
                                            Remove
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              createOrder(prescription._id);
                            }}
                          >
                            Confirm Order
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
