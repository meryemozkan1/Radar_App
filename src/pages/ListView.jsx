import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const ListView = ({ setDetailId }) => {
  const { flights } = useSelector((store) => store.flight); // flights olmalı

  //slice methodunda kullanılacak ilk eleman statei
  const [itemOffset, setItemOffset] = useState(0);

  //*Sayfa başına eleman sayısı
  const itemsPerpage = 10;
  //Slice methodunda kullanılacak son elemanın stateti
  const endOffset = itemOffset + itemsPerpage;
  //Mervcut sayfadaki elemanları alma
  const currentItems = flights.slice(itemOffset, endOffset);
  // Max sayfa saıyısı
  const pageCount = Math.ceil(flights.length / itemsPerpage);

  //Yeni sayfaya tıklanınca stati günceller
  const handlePageClick = (event) => {
    // Yeni sayfadaki elemanın dizideki sırsnı belirler
    const newOffset = (event.selected * itemsPerpage) % flights.length;

    setItemOffset(newOffset);
  };
  return (
    <div className="p-4">
      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>KUYRUK KODU</th>
            <th>ENLEM</th>
            <th>BOYLAM</th>
            <th>İŞLEM</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.code}</td>
              <td>{flight.lat}</td>
              <td>{flight.lng}</td>
              <td>
                <button onClick={() => setDetailId(flight.id)}>Detay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        className="pagination justify-content-center my-5"
        pageClassName="page-item"
        // "önceki" butonun bulunduğu liste öğesine uygulanacak sınıf
        previousClassName="page-item"
        // "sonraki" butonun bulunduğu liste öğesine uygulunacak sınıf
        nextClassName="page-item"
        // sayfa numaralarına uygulanacak sınıf
        pageLinkClassName="page-link"
        // sonraki butonuna uygulanacak sınıf
        nextLinkClassName="page-link"
        // önceki butonuna uygulanacak sınıf
        previousLinkClassName="page-link"
        // sayfa numaraları arasında boşluk bırakmak için kullanılan noktaya uygulanır
        breakClassName="page-link"
        // sayfa numaraları arasında boşluk bırakmak için kullanılan nokta
        breakLabel="..."
        nextLabel="İleri >"
        // sayfa numaraları değiştiğinde tetiklenecek fonksiyon
        onPageChange={handlePageClick}
        activeClassName="active"
        pageRangeDisplayed={5}
        // toplam sayfa sayısı
        pageCount={pageCount}
        previousLabel="< Geri"
        // sayfa sayısı sıfır olduğunda ne yapılacağını söyler
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default ListView;
