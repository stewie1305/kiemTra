export default function EmployeesPage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Employees</h2>
        <p className="text-sm text-muted-foreground">
          Danh sách nhân viên quản trị.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          Chưa có dữ liệu nhân viên.
        </p>
      </div>
    </section>
  );
}
