export default async function Home() {
  const res = await fetch("http://localhost:5000/api/get", {
    cache: "no-cache",
  });
  const data = await res.json();
  return (
    <main>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

// export async function getServerSideProps() {
//   try {
//     const res = await fetch("http://localhost:5000/api/get");
//     const data = res.json();

//     return {
//       props: { data },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: { data: null },
//     };
//   }
// }
