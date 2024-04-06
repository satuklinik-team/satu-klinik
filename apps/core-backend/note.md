# ICD10CM

Nama klasifikasi nya adalah ICD9CM, berisikan tindakan dokter terhadap pasien, ex: ngasih infus, operasi kecil/ringan dll -> in english

# ICD10

Nama klasifikasi sudah benar, berisikan data penyakit standar WHO, ex: migrain

# Patient_medical_records

setiap kunjungan datanya disimpan disini

# Patient_assessment

Berisi SOAP (hasil pemeriksaan) dari dokter
SOAP = Subjektif Objektif Assesment Plan

field `plan` blm keisi

# Patient_medical_records

e1 -> entry oleh admin (data baru)
d1 -> sudah diperiksa oleh dokter
p1 -> sudah ambil obat

- queue
  - A itu berdasarkan jumlah poli

# Known problems

- Masalah timezone date dari client ke server ke database
