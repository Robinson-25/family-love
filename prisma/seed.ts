import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Limpiar datos anteriores
  await prisma.hotelcenter.deleteMany();

  // Crear sede principal de Family Love
  await prisma.hotelcenter.create({
    data: {
      name: "Family Love - Sede Central",
      reference: "A 2 cuadras del parque principal",
      address: "Jr. La Familia 123, Lima",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.0!2d-77.0428!3d-12.0464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
      description: "Somos una organización dedicada a fortalecer el núcleo familiar y brindar apoyo integral a quienes más lo necesitan, con amor y compromiso.",
      urlSegment: "sede-central",
      cellPhone: "999888777",
      phone: "014441234",
    },
  });

  await prisma.hotelcenter.create({
    data: {
      name: "Family Love - Sede Norte",
      reference: "Frente al colegio San José",
      address: "Av. Esperanza 456, Lima Norte",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.0!2d-77.0528!3d-11.9964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
      description: "Nuestra sede norte atiende a familias de la zona con programas de acompañamiento, talleres y actividades para niños, jóvenes y adultos.",
      urlSegment: "sede-norte",
      cellPhone: "999777666",
      phone: "014445678",
    },
  });

  console.log("✅ Seed completado - Datos de Family Love insertados");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });