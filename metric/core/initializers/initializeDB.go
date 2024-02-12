package initializers

import (
	"core/models"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitializeDB() {

	var err error

	dsn := os.Getenv("DB_URL")
	DB, err = gorm.Open(postgres.Open(dsn))

	if err != nil {
		log.Fatal("Failed to start the database")
	}
	DB.AutoMigrate(&models.Snapshot{})
}